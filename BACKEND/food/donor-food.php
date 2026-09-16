<?php

header("Content-Type: application/json");

require_once "../config/db.php";


try {

    // Get donor ID sent from JavaScript
    $donorId = $_GET["donor_id"] ?? null;


    // Check donor ID
    if (!$donorId) {

        echo json_encode([
            "success" => false,
            "message" => "Donor ID is required."
        ]);

        exit;
    }


    // Make sure donor ID is an integer
    $donorId = (int) $donorId;


    // ==========================================
    // GET STATISTICS
    // ==========================================

    $statsSql = "
        SELECT

            COUNT(*) AS total,

            SUM(
                CASE
                    WHEN status = 'AVAILABLE'
                    THEN 1
                    ELSE 0
                END
            ) AS available,

            SUM(
                CASE
                    WHEN status = 'CLAIMED'
                    THEN 1
                    ELSE 0
                END
            ) AS claimed,

            SUM(
                CASE
                    WHEN status = 'DELIVERED'
                    THEN 1
                    ELSE 0
                END
            ) AS delivered

        FROM food_listings

        WHERE donor_id = :donor_id
    ";


    $statsStmt = $pdo->prepare($statsSql);

    $statsStmt->execute([
        ":donor_id" => $donorId
    ]);


    $stats = $statsStmt->fetch();


    // ==========================================
    // GET FOOD LISTINGS
    // ==========================================

    $foodSql = "
    SELECT

        f.id,
        f.food_title,
        f.category,
        f.quantity,
        f.pickup_address,
        f.latitude,
        f.longitude,
        f.expiry_datetime,
        f.status,
        f.claimed_by,
        f.created_at,

        /* RECEIVER DETAILS */
        u.ngo_name AS ngo_name,
        u.contact_person AS contact_person,
        u.phone AS recipient_phone,
        u.address AS recipient_address

    FROM food_listings f

    LEFT JOIN users u
        ON f.claimed_by = u.id
        AND u.role = 'RECIPIENT'

    WHERE f.donor_id = :donor_id

    ORDER BY f.created_at DESC
";


    $foodStmt = $pdo->prepare($foodSql);

    $foodStmt->execute([
        ":donor_id" => $donorId
    ]);


    $foodListings = $foodStmt->fetchAll();


    // ==========================================
    // RETURN DATA
    // ==========================================

    echo json_encode([

        "success" => true,

        "stats" => [

            "total" =>
            (int) ($stats["total"] ?? 0),

            "available" =>
            (int) ($stats["available"] ?? 0),

            "claimed" =>
            (int) ($stats["claimed"] ?? 0),

            "delivered" =>
            (int) ($stats["delivered"] ?? 0)

        ],

        "food" => $foodListings

    ]);
} catch (PDOException $e) {

    echo json_encode([

        "success" => false,

        "message" =>
        "Database error: " . $e->getMessage()

    ]);
}
