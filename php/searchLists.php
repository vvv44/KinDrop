<?php
// PHP Data Objects(PDO) Sample Code:
try {
    $conn = new PDO("sqlsrv:server = tcp:kindrop.database.windows.net,1433; Database = kindrop Wishlists", "kindropadmin", "vsilva13/09");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $query = $conn->prepare('SELECT * FROM wishlists');
    $query->execute();
    $rows = $query->fetchAll(PDO::FETCH_CLASS);
    $rowsToReturn;
    foreach ($rows as $row) {
        $rowsToReturn[] = $row;
    }
    echo json_encode($rowsToReturn);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}
?>