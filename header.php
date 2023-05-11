<header class="container-fluid header row justify-content-between"> <!-- sticky-top -->
    <!-- Logo container -->
    <div class="col-auto logo ml-5">
        <a class="navbar-logo" href="?p=home">
            <img src="assets/Logo.png" class="d-inline-block align-top" id="logoimg">
        </a>
    </div>

    <!-- Navbar container -->
    <nav class="navbar navbar-expand-lg mr-5" id="mynav">
        <div class="d-flex justify-content-center">
            <div class="header-link-container px-3 navbar-toggler" id="search-btn">
                <i class="fa fa-search fa-lg"></i>
            </div>
            <button class="navbar-toggler" type="button" id="hamburger">
                <div class="animated-togglebutton">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
        </div>
        <div class="collapse navbar-collapse flex-row" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <div class="header-link-container pl-1 pr-1">
                    <img src="assets/forme.png" alt="" class="jumping-foto2">
                    <a class="nav-item nav-link" href="?p=home">Home</a>
                </div>
                <div class="header-link-container pl-1 pr-1">
                    <img src="assets/forme.png" alt="" class="jumping-foto2">
                    <a class="nav-item nav-link" href="?p=about_us">About Us</a>
                </div>
                <div class="header-link-container pl-1 pr-1">
                    <img src="assets/forme.png" alt="" class="jumping-foto2">
                    <a class="nav-item nav-link" href="#">Classifiche</a>
                </div>
                <div class="header-link-container pl-1 pr-1">
                    <img src="assets/forme.png" alt="" class="jumping-foto2">
                    <a class="nav-item nav-link" href="?p=login" name="personal">Login</a>
                </div>
                <div class="header-link-container pl-1 pr-1" id="search-btn2">
                    <i class="fa fa-search fa-lg"></i>
                </div>
            </div>
        </div>
    </nav>
</header>

<!-- Dropdown Responsive Navbar -->
<div class="dropdown-nav-container">
    <div class="dropdown-wrapp">
        <a class="nav-item nav-link dropdown-link" href="?p=home">Home</a>
    </div>
    <div class="dropdown-separator"></div>
    <div class="dropdown-wrapp">
        <a class="nav-item nav-link dropdown-link" href="?p=about_us">About Us</a>
    </div>
    <div class="dropdown-separator"></div>
    <div class="dropdown-wrapp">
        <a class="nav-item nav-link dropdown-link" href="#">Classifiche</a>
    </div>
    <div class="dropdown-separator"></div>
    <div class="dropdown-wrapp">
        <a class="nav-item nav-link dropdown-link" href="?p=login" name="personal">Login</a>
    </div>
</div>

<!-- Searchbar -->
<div class="dropdown-search-container">

    <div class="search-container">
        <div class="dropdown-wrapp d-flex align-items-center">
            <input type="text" class="search-input" maxlength="256" name="search" filter-by="*"
                data-name="Search" placeholder="Type your request">
            <div class="close-search">
                <img src="https://assets.website-files.com/61c070585317d242d3a59789/61c070585317d200afa59815_search-close.svg"
                    loading="lazy">
            </div>
        </div>

        <div class="dropdown-separator-search-input"></div>
    </div>


    <div class="container-fluid search-game-result">

    </div>
</div>
