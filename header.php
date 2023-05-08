<header class="container-fluid header row justify-content-between"> <!-- sticky-top -->
    <!-- Logo container -->
    <div class="col-auto logo ml-5">
        <a class="navbar-logo" href="?p=home">
            <img src="assets/Logo.png" class="d-inline-block align-top" id="logoimg">
        </a>
    </div>

    <!-- Navbar container -->
    <nav class="navbar navbar-expand-lg mr-5" id="mynav">
        <div class="boh">
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
                    <a class="nav-item nav-link" href="#">About Us</a>
                </div>
                <div class="header-link-container pl-1 pr-1">
                    <img src="assets/forme.png" alt="" class="jumping-foto2">
                    <a class="nav-item nav-link" href="#">Classifiche</a>
                </div>
                <div class="header-link-container pl-1 pr-1">
                    <img src="assets/forme.png" alt="" class="jumping-foto2">
                    <a class="nav-item nav-link" href="#">Supporto</a>
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
<div class="dropdownHome" id="dropdown-menu">
    <div class="dropdown-wrapp">
        <a class="nav-item nav-link dropdown-link" href="#">About Us</a>
    </div>
    <div class="dropdown-separator"></div>
    <div class="dropdown-wrapp">
        <a class="nav-item nav-link dropdown-link" href="#">Classifiche</a>
    </div>
    <div class="dropdown-separator"></div>
    <div class="dropdown-wrapp">
        <a class="nav-item nav-link dropdown-link" href="#">Supporto</a>
    </div>
    <div class="dropdown-separator"></div>
    <div class="dropdown-wrapp">
        <a class="nav-item nav-link dropdown-link" href="?p=login" name="personal">Login</a>
    </div>
</div>

<!-- Searchbar -->
<div class="dropdownHome" id="dropdown-search">
    <div class="search-container">
        <div class="dropdown-wrapp">
            <form class="form-inline">
                <!-- <input class="form-control mr-sm-2" type="search" placeholder="Cerca" aria-label="Search"> -->
                <input type="text" class="search-input w-input" maxlength="256" name="search" filter-by="*" data-name="Search" placeholder="Type your request" id="search">
            </form>
        </div>
        <div class="close-search">
            <img src="https://assets.website-files.com/61c070585317d242d3a59789/61c070585317d200afa59815_search-close.svg" loading="lazy" alt="" class="image-9">
        </div>
    </div>
    <div class="dropdown-separator-search"></div>
</div>
