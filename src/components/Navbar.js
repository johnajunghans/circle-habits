import '../styles/navbar.css'

const Navbar = () => {

    const navLinks = [
        {
            name: "My Account",
            url: "/account"
        }
    ]

    return (
        <div id="nav-wrapper">
            <nav>
                <div id="logo-wrapper">
                    <h2>Circle Habits</h2>
                </div>
                <div id="nav-links-wrapper">
                    <ul>
                        {navLinks.map(link => (
                            <li
                                key={navLinks.indexOf(link)}
                                className='nav-link'
                                id={`link-${link.name}`}
                            >
                                <a
                                    url={link.url}
                                >{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;