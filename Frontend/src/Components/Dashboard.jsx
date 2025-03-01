import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "./GoalForm";
import { getGoals, reset } from "../Features/Goals/GoalSlice";
import Spinnner from "../Components/Spinnner";
import GoalItem from "./GoalItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return
    }
    if (isError) {
      console.log(message);
    }
    dispatch(getGoals(user.token));
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  if (isLoading) return <Spinnner />;
  return (
    <div>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
        <GoalForm />
        <section className="content">
          {goals.length > 0 ? (
            <div className="goals">
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </div>
          ) : (
            <h3>You have not creatd any goals</h3>
          )}
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
