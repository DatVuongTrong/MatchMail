import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export const NavigationBar = () => {
    return (
        <Navbar isBlurred isBordered maxWidth="full" height="5rem">
            <NavbarBrand>
                <p className="font-bold text-inherit text-2xl">MatchMail</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="login" className="bg-gradient-to-r from-violet-600 to-indigo-600">
                        Login
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}