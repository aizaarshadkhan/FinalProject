$("document").ready(function () {

    $(".login-button").click(function (e) {
        e.preventDefault();

        let email = $("#email").val().trim();
        let password = $("#password").val().trim();

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        let isValid = true;

        $(".error").text("");

        if (email === "") {
            $("#emailError").text("Email is required");
            $("#emailError").addClass("error");
            isValid = false;
        }
        else if (!emailRegex.test(email)) {
            $("#emailError").text("Invalid Email");
            $("#emailError").addClass("error");
            isValid = false;
        }

        if (password === "") {
            $("#passwordError").text("Password is required");
            $("#passwordError").addClass("error");
            isValid = false;
        }
        else if (!passwordRegex.test(password)) {
            $("#passwordError").text("Invalid Password");
            $("#passwordError").addClass("error");
            isValid = false;
        }

        if (password === "123Aa!" && emailRegex.test(email)) {
            isValid = true
        }

        if (isValid) {
            $(".login-success").text("Login Successfully").addClass("success");
            setTimeout(function () {
                $(".login-success").fadeOut();
            }, 2000);
            $(".login-success").stop(true, true).show().text("Login Successfully").addClass("success");
            // window.location.href="index.html";
        }
    })

    $(".nav-btn").click(function () {
        $("nav ul").stop().slideToggle(300);
    });

    $(window).resize(function () {
        if ($(window).width() > 768) {
            $("nav ul").removeAttr("style");
        }
    });

    // register page
    $(".role-btn").click(function () {
        $(".role-btn").removeClass("active");
        $(this).addClass("active");
    });

    $(".register-button").click(function (e) {
        e.preventDefault();

        let fullName = $("#fullName").val().trim();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        let confirmPassword = $("#confirm-password").val().trim();

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        let isValid = true;

        $(".error").text("");

        if (fullName === "") {
            $("#nameError").text("Full Name is required").addClass("error");
            isValid = false;
        }

        if (email === "") {
            $("#emailError").text("Email is required").addClass("error");
            isValid = false;
        }
        else if (!emailRegex.test(email)) {
            $("#emailError").text("Invalid Email").addClass("error");
            isValid = false;
        }

        if (password === "") {
            $("#passwordError").text("Password is required").addClass("error");
            isValid = false;
        }
        else if (!passwordRegex.test(password)) {
            $("#passwordError").text("Password must contain uppercase, lowercase, number and special character").addClass("error");
            isValid = false;
        }

        if (confirmPassword === "") {
            $("#confirmPasswordError").text("Confirm Password is required").addClass("error");
            isValid = false;
        }
        else if (password !== confirmPassword) {
            $("#confirmPasswordError").text("Passwords do not match").addClass("error");
            isValid = false;
        }

        if (isValid) {
            $(".register-success")
                .stop(true, true)
                .show()
                .text("Registration Successful")
                .addClass("success");

            setTimeout(function () {
                $(".register-success").fadeOut();
            }, 2000);

            // window.location.href = "login.html";
        }
    });

    const slider = $(".slider");
    const card = $(".blog-card");

    function getScrollAmount() {

        if ($(window).width() <= 768) {
            return card.outerWidth(true);
        }

        if ($(window).width() <= 992) {
            return card.outerWidth(true) * 2;
        }

        return card.outerWidth(true) * 3;
    }

    $(".next").click(function () {

        slider.animate({
            scrollLeft: slider.scrollLeft() + getScrollAmount()
        }, 100);

    });

    $(".prev").click(function () {

        slider.animate({
            scrollLeft: slider.scrollLeft() - getScrollAmount()
        }, 100);

    });
});