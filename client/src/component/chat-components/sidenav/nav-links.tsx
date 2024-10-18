import GroupContainer from "./groups/group-container";
import FetchInviteListData from "./invites/invites-nav-data";
import FetchNavLinkData from "./nav-links-data";
import NavSection from "./navsections";

const NavLinks = () => {
  return (
    <nav className=" space-y-10">
      {/* communities */}
      <NavSection headertext="Communities">
        <GroupContainer />
      </NavSection>
      {/* friends */}
      <NavSection headertext="Friends / Users">
        <FetchNavLinkData />
      </NavSection>
      {/* invitessss */}
      <NavSection headertext="Invites">
        <FetchInviteListData />
      </NavSection>
    </nav>
  );
};

export default NavLinks;
