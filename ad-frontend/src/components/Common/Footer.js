const Footer = () => {
    return (
        <footer className="dark:bg-gray-700 text-white bottom-0 left-0 z-20 w-full p-4 border-t border-default shadow-sm md:flex md:items-center md:justify-between md:p-6">
            <span className="text-sm text-body sm:text-center">© 2026 <a href="#" className="hover:underline">AdTech</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </footer>

    );
};

export default Footer;