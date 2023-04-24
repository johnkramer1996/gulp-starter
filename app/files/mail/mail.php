<?php

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
	exit();
}

$admin_email = 'vitaliyzinoviev@mail.ru';
$sitename  = 'Украинский производитель натурального шоколада и конфет';
$subject   = 'Новая заявка с сайта \'' . $sitename . '\'';
$name = '\'' . $sitename . '\'';
$email = 'noreply@site.ru';


function checkbox($array)
{
	$check = implode(", ", $array);
	$check = substr($check, 0);
	return $check;
}

function table_row_title($title)
{
	return '
	<tr>
		<td bgcolor="#f8f8f8" style="padding: 10px;" colspan="2">
			<b>
				' . $title . '
			</b>
		</td>
	</tr>';
}

function table_row($name, $value)
{
	if (!isset($_POST[$name]) || $_POST[$name] === '') return '';
	$name = is_array($_POST[$name]) ? checkbox($_POST[$name]) : $_POST[$name];
	return '
	<tr>
		<td bgcolor="#f8f8f8" style="padding: 10px" width="30%">
			' . $value . '
		</td>
		<td width="300" style="padding: 10px" width="70%">
			' . $name . '
		</td>
	</tr>';
}

function send_mail($to, $body, $email, $filename, $subject)
{
	$boundary = "--" . md5(uniqid(time()));
	$headers = "From: " . $email . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";
	$multipart = "--" . $boundary . "\r\n";
	$multipart .= "Content-type: text/html; charset=\"utf-8\"\r\n";
	$multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

	$body = $body . "\r\n\r\n";

	$multipart .= $body;
	foreach ($filename as $key => $value) {
		$fp = fopen($value[0], "r");
		$content = fread($fp, filesize($value[0]));
		fclose($fp);
		$file = "--" . $boundary . "\r\n";
		$file .= "Content-Type: application/octet-stream\r\n";
		$file .= "Content-Transfer-Encoding: base64\r\n";
		$file .= "Content-Disposition: attachment; filename=\"" . $value[1] . "\"\r\n\r\n";
		$file .= chunk_split(base64_encode($content)) . "\r\n";
	}
	$multipart .= $file . "--" . $boundary . "--\r\n";
	mail($to, $subject, $multipart, $headers);
}

if ($_FILES) {
	$filename = array();
	$i = 0;
	foreach ($_FILES["file"]["error"] as $key => $error) {
		if ($error == UPLOAD_ERR_OK) {
			$filename[$i][0] = $_FILES["file"]["tmp_name"][$key];
			$filename[$i][1] = $_FILES["file"]["name"][$key];
			$i++;
		}
	}
}

$message = '';

if (isset($_POST['form'])) $message .= table_row_title('Письмо');
$message .= table_row('form', 'Заявка с формы');

if (isset($_POST['name']) || isset($_POST['phone'])) $message .= table_row_title('Контакты');
$message .= table_row('name', 'Имя');
$message .= table_row('phone', 'Телефон');
$message .= table_row('email', 'Электронная почта');
$message .= table_row('comment', 'Ваш вопрос');


$message = '<table border="1" width="100%">' . $message . '</table>';
$headers = "From: $name <$email>" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"";

send_mail($admin_email, $message, $email, $filename, $subject);
