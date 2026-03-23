<?php
// public/contact.php

// Configuración
// Email de prueba (desarrollo) — cambiar a 'contacto@atlc.cl' en producción
$destinatario = 'codigoraul@gmail.com';
// $destinatario = 'contacto@atlc.cl'; // ← Descomentar esta línea en producción
$asunto_prefix = '[ATLC Web] Nuevo mensaje de contacto';

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contacto/');
    exit;
}

// Sanitizar y validar campos
$nombre   = isset($_POST['nombre'])   ? htmlspecialchars(trim($_POST['nombre']))   : '';
$email    = isset($_POST['email'])    ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$telefono = isset($_POST['telefono']) ? htmlspecialchars(trim($_POST['telefono'])) : '';
$mensaje  = isset($_POST['mensaje'])  ? htmlspecialchars(trim($_POST['mensaje']))  : '';

// Validaciones básicas
if (empty($nombre) || empty($email) || empty($mensaje)) {
    header('Location: /contacto/?error=1');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: /contacto/?error=1');
    exit;
}

// Construir el email
$asunto = $asunto_prefix . ' - ' . $nombre;

$cuerpo  = "Has recibido un nuevo mensaje desde el formulario de contacto de atlc.cl\n\n";
$cuerpo .= "-------------------------------------------\n";
$cuerpo .= "Nombre:    $nombre\n";
$cuerpo .= "Email:     $email\n";
$cuerpo .= "Teléfono:  $telefono\n";
$cuerpo .= "-------------------------------------------\n\n";
$cuerpo .= "Mensaje:\n$mensaje\n";

// Headers del email
$headers  = "From: noreply@atlc.cl\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Enviar email
$enviado = mail($destinatario, $asunto, $cuerpo, $headers);

// Redirigir según resultado
if ($enviado) {
    header('Location: /contacto/?enviado=1');
} else {
    header('Location: /contacto/?error=1');
}
exit;
?>
