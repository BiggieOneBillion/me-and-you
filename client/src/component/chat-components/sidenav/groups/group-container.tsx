import CreateGroupModal from "./create-group-modal";
import GroupListCard from "./group-list-card";

const GroupContainer = () => {
  return (
    <section className="space-y-3">
      {/* create new group button */}
      <CreateGroupModal />
      {/* show all groups */}
      <GroupListCard />
    </section>
  );
};

export default GroupContainer;
