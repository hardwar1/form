<?php 
// подключение файлов
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/Exception.php';
require 'PHPMailer/SMTP.php';

$title = 'Тема письма';
$image = $_FILES['image']; // все картинки сюда 

foreach ($_POST as $key => $value) {
  if ($value != '' && $key != 'project_name' && $key != "admin_email"  && $key != "form_subject") {
    $body .= " 
      " . ( ($c = !$c) ? '<tr>': '<tr style=" background-color: #f8f8f8; "> ') . "
      <td style='padding: 10px; border: 1px solid #e9e9e9;'><b>$key</b></td>
      <td style='padding: 10px; border: 1px solid #e9e9e9;'>$value</td>
      </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth = true;

  // настройка почты
  $mail->Host = 'smtp.gmail.com'; //SMTP сервера вашей почты
  $mail->Username = 'xapgbap2@gmail.com'; //логин вашей почты
  $mail->Password = ''; //Пароль вашей почты
  $mail->SMTPSecure = 'ssl'; 
  $mail->Port = 465; 


  $mail->SetFrom('xapgbap2@gmail.com', 'Письмо с вашего сайта'); // отправитель письма

  //получатели письма
  $mail->addAddress('xapgbap2@gmail.com'); // можно добавить еще такую же строку с другим адресом

  // Прикрипление файлов к письму
  if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
      $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
      $filename = $file['name'][$ct];
      if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
          $mail->addAttachment($uploadfile, $filename);
          $rfile[] = "Файл $filename прикреплён";
      } else {
          $rfile[] = "Не удалось прикрепить файл $filename";
      }
    }
  }

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();



} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
