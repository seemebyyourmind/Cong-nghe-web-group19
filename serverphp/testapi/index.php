<?php
header('Access-Control-Allow-Origin: http://localhost:7456');
header('Access-Control-Allow-Methods: POST ,GET');
header('Access-Control-Allow-Headers: Content-Type');

$hostdb="localhost";
$userdb="root";
$passworddb="";
$db="cocosdb";
$connect = mysqli_connect($hostdb, $userdb, $passworddb, $db);
if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());

}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = file_get_contents("php://input");
  $requestData = json_decode($data, true);

    if(isset($requestData['action'])){
    // Xác định yêu cầu 
   
    $action = $requestData['action'];
    if ($action === "login") {
         // Ví dụ: Lấy thông tin tài khoản và mật khẩu từ yêu cầu POST
    $username = $requestData['username'];
    $password = $requestData['password'];
    $response=loginCheck($username,$password,$connect);
    echo $response;
    // Tiếp tục xử lý thông tin đăng nhập hoặc đăng ký
    // ...    
      } elseif ($action === "register") {
        $username=$requestData['username'];
        $password=$requestData['password'];
        $email=$requestData['email'];
        $level=$requestData['level'];
        $response=resisterCheck($username,$password,$email,$level,$connect);
        echo $response;
      } else {
        // Xử lý khi không xác định được loại yêu cầu
      }
    // Ví dụ: Lấy thông tin tài khoản và mật khẩu từ yêu cầu POST
    
    // Tiếp tục xử lý thông tin đăng nhập hoặc đăng ký
    // ...
}}
//connect db

//login function
function loginCheck($username,$password,$connect){

$query_user="SELECT username, password FROM admin WHERE username='$username' and password='$password'";
$result_user= mysqli_query($connect, $query_user);

if (mysqli_num_rows($result_user)>0) {
    
    $query_user="SELECT username, password,level FROM admin WHERE username='$username' and password='$password'";
    $result_user= mysqli_query($connect, $query_user);
    $row=mysqli_fetch_array($result_user,MYSQLI_NUM);
    // echo $row[0];
    return json_encode(['success' => 'ok','data'=>$row]); // Trả về dữ liệu dưới dạng JSON
   }
    else{
      return json_encode(['success' => 'fail']); // Trả về thông báo lỗi dưới dạng JSON
      
    }
}

//resister function
function resisterCheck($username,$password,$email,$level,$connect){
$query_email = "SELECT email FROM admin WHERE email='$email' ";
$result_email = mysqli_query($connect, $query_email);
$query_username="SELECT username FROM admin WHERE username='$username'";
$result_username= mysqli_query($connect, $query_username);



if(mysqli_num_rows($result_username)>0){
  return json_encode(['success' => 'fail','error'=>'username']);
}
if(mysqli_num_rows($result_email)>0){
  return json_encode(['success' => 'fail','error'=>'email']);
}
$query_resister = "INSERT INTO admin (username,password,email,level) VALUE ('{$username}','{$password}','{$email}','{$level}')";
$result_resister = mysqli_query($connect, $query_resister);
if($result_resister){
  return json_encode(['success' => 'ok']);
}

// đăng ký thông tin vào database

   
}




?>