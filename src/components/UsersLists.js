import UserCard from "./UserCard"

function UserLists({users}) {

  return (
    <div className="listcontainer" style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "10px",
        padding:"0% 5%"
    }}>
        {users.map(user => (
            <UserCard key={user.id} user={user}></UserCard>
        ))}
    </div>
  )

}

export default UserLists