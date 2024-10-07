'use client';

import {
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar
} from "@nextui-org/react";

export const NavigationBar = ({ isAuthPage = true }) => {
    return isAuthPage ? (
        <Navbar isBlurred isBordered maxWidth="full" height="5rem" className="dark">
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
    ) : (
        <Navbar isBordered maxWidth="full" height="5rem">
            <NavbarBrand>
                <p className="font-bold text-inherit text-2xl">MatchMail</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-8" justify="end">
                <NavbarItem>
                    <Link className="text-inherit font-semibold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent" href="">
                        Add Profile
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-inherit font-semibold" href="" color="secondary">
                        Database
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Dropdown className="dark" placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-8">
                                <p className="font-semibold" >Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings">Setting</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>
        </Navbar>

    );
}