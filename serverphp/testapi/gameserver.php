<?php
//header("Access-Control-Allow-Origin: https://webgame19.000webhostapp.com");
header("Access-Control-Allow-Origin: http://localhost:7456");

// Kết nối đến cơ sở dữ liệu MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gamedb";

$conn = new mysqli($servername, $username, $password, $dbname);

$request = $_POST['request'];

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sign in
if ($request == "signin"){
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Truy vấn dữ liệu từ bảng "user"
    $sql = "SELECT * FROM user WHERE username = '".$username."' AND password = '".$password."'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch the first row (assuming id is unique)
        $row = $result->fetch_assoc();
        $levelUnlocked = $row["level_unlocked"];

        // Create an array to hold the level_unlocked value
        $gameData = array("level_unlocked" => $levelUnlocked);

        // Encode the game data as JSON and output it
        echo json_encode($gameData);
    } else {
        echo -1;
    }
}

// Sign up
if ($request == "signup"){
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Truy vấn dữ liệu từ bảng "user"
    $sql = "SELECT * FROM user WHERE username = '".$username."'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo -1;
    } else {
        $insert_sql = "INSERT INTO user VALUES( NULL, '$username', '$password', 1)";
        $result = mysqli_query($conn, $insert_sql);

        echo 1;
    }
}

// Save data
if ($request == "save"){
    $username = $_POST['username'];
    $value = $_POST['value'];
    // Truy vấn dữ liệu từ bảng "user"
    $save_sql = "UPDATE user
            SET level_unlocked = '$value'
            WHERE username = '$username'";
    $result = mysqli_query($conn, $save_sql);
}



$conn->close();
?>