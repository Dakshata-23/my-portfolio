<?php

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://dakshatashukla.in');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

// Verify origin
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== 'https://dakshatashukla.in') {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden: Invalid origin.']);
    exit;
}

// Get and validate input
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['endpoint']) || !isset($input['data'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request. Missing endpoint or data.']);
    exit;
}

$endpoint = $input['endpoint'];
$data = $input['data'];

// Load API key
$apiKey = getenv('GOOGLE_API_KEY') ?: "YOUR_API_KEY_HERE";
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['error' => 'API key not configured.']);
    exit;
}

// Restrict responses to only relevant context
if (isset($input['data']['message'])) {
    $message = strtolower($input['data']['message']);
    $forbiddenTopics = ['general', 'wide range', 'massive amount of information', 'topics unrelated to Dakshata'];

    foreach ($forbiddenTopics as $topic) {
        if (strpos($message, $topic) !== false) {
            echo json_encode(['error' => 'I can only answer questions about Dakshata Shukla’s professional background, skills, and projects.']);
            exit;
        }
    }
}

// Route to appropriate handler
if ($endpoint === 'chat') {
    handleChat($data, $apiKey);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found.']);
}

function handleChat($data, $apiKey) {
    if (!isset($data['message'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Message is required.']);
        exit;
    }

    $message = $data['message'];
    $history = $data['history'] ?? [];

    // System prompt for Dakshata's AI assistant
    $systemInstruction = "You are Dakshata's AI assistant on her portfolio website. You help visitors learn about Dakshata Shukla - her skills, projects, experience, and how to contact her. Be helpful, friendly, and professional. If you don't know something specific about Dakshata, suggest the visitor check the relevant sections of the website or contact her directly.";

    // Build conversation context for Gemini
    $contents = [];
    
    // Add conversation history
    foreach ($history as $turn) {
        $role = ($turn['role'] === 'user') ? 'user' : 'model';
        $contents[] = [
            'role' => $role,
            'parts' => [['text' => $turn['content']]]
        ];
    }
    
    // Add current message
    $contents[] = [
        'role' => 'user',
        'parts' => [['text' => $message]]
    ];

    // Prepare request to Gemini API - Using gemini-1.5-flash (cheapest, fastest)
    $geminiData = [
        'contents' => $contents,
        'systemInstruction' => [
            'parts' => [['text' => $systemInstruction]]
        ],
        'generationConfig' => [
            'temperature' => 0.7,
            'topK' => 40,
            'topP' => 0.95,
            'maxOutputTokens' => 512,  // Reduced for cost efficiency
        ],
        'safetySettings' => [
            [
                'category' => 'HARM_CATEGORY_HARASSMENT',
                'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
            ],
            [
                'category' => 'HARM_CATEGORY_HATE_SPEECH',
                'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
            ],
            [
                'category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
            ],
            [
                'category' => 'HARM_CATEGORY_DANGEROUS_CONTENT',
                'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
            ]
        ]
    ];

    // Using Gemini 1.5 Flash - the cheapest and fastest model
    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=" . $apiKey;
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($geminiData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        http_response_code(500);
        echo json_encode(['error' => 'Request failed: ' . $curlError]);
        exit;
    }

    if ($httpCode !== 200) {
        http_response_code($httpCode);
        echo $response;
        exit;
    }

    // Parse Gemini response
    $geminiResponse = json_decode($response, true);
    
  
    if (isset($geminiResponse['candidates'][0]['content']['parts'][0]['text'])) {
        $reply = $geminiResponse['candidates'][0]['content']['parts'][0]['text'];
        echo json_encode([
            'success' => true,
            'message' => $reply
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'error' => 'Invalid response from AI',
            'raw' => $geminiResponse
        ]);
    }
}

?>