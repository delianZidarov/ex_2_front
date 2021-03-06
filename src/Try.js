import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { console } from "./redux/actions";
import { tryPost } from "./redux/actions";
import { sendSignup } from "./redux/actions";
import { sendNutritionData } from "./redux/actions";
import { checkUserAvailability } from "./redux/actions";
import { clearErrorMessage } from "./redux/actions";
import { setUserId } from "./redux/actions";
import { getDailyNutrition } from "./redux/actions";
import { deleteMeal } from "./redux/actions";
import { sendExercise } from "./redux/actions";
import { sendCaloriesBurned } from "./redux/actions";
import { deleteExercise } from "./redux/actions";
import { getExercises } from "./redux/actions";
import { getCalories } from "./redux/actions";
import { sendSignin } from "./redux/actions";
import { logOut } from "./redux/actions";
import Popups from "./components/Popups";
import RadialProgressBar from "./components/RadialProgressBar";
function Try() {
  //toggle popup
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  //DEBOUNCE DECLARE
  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func(...args);
      }, timeout);
    };
  };
  //TRY FORM SAVE
  let canYouSeeMe = useSelector((state) => state.canYouSeeMe);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
  });
  //SIGNUP FORM SAVE
  const [signupData, setSignupData] = React.useState({
    userName: "",
    email: "",
    password: "",
  });

  //NUTRITION FORM SAVE
  const [nutritionData, setNutritionData] = React.useState({ save: false });
  const [exerciseData, setExerciseData] = React.useState();
  //GETTING THE STATE
  let state = useSelector((state) => state);
  window.console.log("STATE", state);
  //DISPATCH & NAVIGATE
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //SIGNIN
  const handleSignin = (event) => {
    event.preventDefault();
    dispatch(
      sendSignin({
        userName: document.getElementById("signinName").value,
        password: document.getElementById("signinPass").value,
      })
    );
  };
  //TRY INPUT FUNCTIONS
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(console({ ...formData }));
    dispatch(tryPost({ ...formData }));
    navigate("/");
  };
  //SIGNUP INPUT FUNCTIONS
  const handleSignupChange = (event) => {
    window.console.log("doc", signupData);
    event.preventDefault();
    setSignupData({ ...signupData, [event.target.name]: event.target.value });

    debounce(
      dispatch(
        checkUserAvailability({
          userName: document.getElementById("userName").value,
        })
      ),
      1000
    );
  };
  const handleSubmitSignup = (event) => {
    event.preventDefault();
    dispatch(sendSignup(signupData));
  };
  //NUTRITION INPUT FUNCTIONS
  const handleNutritionChange = (event) => {
    setNutritionData({
      ...nutritionData,
      [event.target.name]: event.target.value,
    });
  };
  const handleNutritionSubmit = (event) => {
    event.preventDefault();
    dispatch(sendNutritionData(nutritionData));
  };
  // EXERCISE INPUT FUNCTIONS
  const handleExerciseChange = (event) => {
    event.preventDefault();
    setExerciseData({
      ...exerciseData,
      [event.target.name]: event.target.value,
    });
  };
  // GET NUTRITION
  const getNutrition = (event) => {
    event.preventDefault();
    dispatch(getDailyNutrition(state.userId));
  };
  // EXERCISE FUNCTIONS
  const handleExerciseSubmit = (event) => {
    event.preventDefault();
    dispatch(sendExercise(state.userId, exerciseData));
  };
  const handleCaloriesSubmit = (event) => {
    event.preventDefault();
    window.console.log(state.user._id);
    dispatch(
      sendCaloriesBurned(state.user._id, {
        calories: document.getElementById("caloriesBurned").value,
      })
    );
  };
  const handleDeleteExercise = (event) => {
    event.preventDefault();
    dispatch(
      deleteExercise(
        state.userId,
        document.getElementById("exerciseDelete").value
      )
    );
  };
  const handleGetExercises = (event) => {
    event.preventDefault();
    dispatch(getExercises(state.userId));
  };
  const handleGetCalories = (event) => {
    event.preventDefault();
    dispatch(getCalories(state.userId));
  };
  //CREATE A FUNCTION FOR DISPATCH TO CLEAR WARNING IN USEEFFECT
  const initClear = React.useCallback(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);
  //USEEFFECT TO CLEAR ERROR
  React.useEffect(() => {
    const timer = setTimeout(() => {
      initClear();
    }, 2000);
    return () => clearTimeout(timer);
  }, [state.error, initClear]);

  return (
    <div className="Try" style={{ background: "white" }}>
      <h1>CAN BE SEEN : {canYouSeeMe}</h1>
      <form>
        <h2>First Name</h2>
        <input type="text" name="firstName" onChange={handleChange} />
        <h2>Last Name</h2>
        <input type="text" name="lastName" onChange={handleChange} />
        <h2>Email</h2>
        <input type="text" name="email" onChange={handleChange} />
        <h2>User Name</h2>
        <input type="text" name="user" onChange={handleChange} />
        <h2>Password</h2>
        <input type="text" name="password" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <h1>USER TEST</h1>
      <h1>SIGN IN</h1>
      <p>
        Name
        <input id="signinName"></input>Password <input id="signinPass"></input>
      </p>
      <button onClick={handleSignin}>Submit Sign in</button>
      <p>User Name : {state.userName}</p>
      <p>User Id: {state._id} </p>
      <p>ERROR: {state.error}</p>
      <form>
        <h2>userName</h2>
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={debounce(handleSignupChange, 300)}
        />
        <p>is available: {state.available ? "True" : "False"}</p>
        <h2>Email</h2>
        <input type="email" name="email" onChange={handleSignupChange} />
        <h2>Password</h2>
        <input type="password" name="password" onChange={handleSignupChange} />
        <br />
        <button type="submit" onClick={handleSubmitSignup}>
          Submit Signup
        </button>
      </form>
      <h1>Sending Nutrition data</h1>
      <div className="flex-row">
        <form>
          <p>I ate</p>
          <input
            type="text"
            name="foodName"
            id="food-name"
            onChange={handleNutritionChange}
          ></input>
          <p>which was</p>
          <input
            type="text"
            name="calories"
            id="calories"
            onChange={handleNutritionChange}
          ></input>
          <p>calories</p>
          <input
            type="checkbox"
            id="save"
            name="save"
            onChange={() => {
              setNutritionData({ ...nutritionData, save: !nutritionData.save });
            }}
          ></input>
          <p>save</p>
          <p>User id</p>
          <input
            type="text"
            name="_id"
            id="_id"
            placeholder="61b4bb1d152f2614dc142aa8"
            onChange={handleNutritionChange}
          ></input>
          <button type="submit" onClick={handleNutritionSubmit}>
            Submit Nutrition
          </button>
        </form>
      </div>
      <h1>Get Nutrition data</h1>
      <form>
        <input id="setUsername"></input>
        <button
          onClick={(event) => {
            event.preventDefault();
            dispatch(setUserId(document.getElementById("setUsername").value));
          }}
        >
          Set User Name
        </button>
      </form>
      <button onClick={getNutrition}>GET NUTRITION</button>
      <h1>delete try</h1>
      <input id="deleteRequest"></input>
      <button
        onClick={(event) => {
          event.preventDefault();
          dispatch(
            deleteMeal(
              state.userId,
              document.getElementById("deleteRequest").value
            )
          );
        }}
      >
        DELETE
      </button>
      <h1>Exerices</h1>
      <form>
        <p>
          Repeat
          <input
            name="routine"
            onChange={handleExerciseChange}
            placeholder="routine"
          ></input>
          <input name="repeat" onChange={handleExerciseChange}></input> Exercise
          Name
          <input name="exerciseName" onChange={handleExerciseChange}></input>
          Exercise time
          <input name="exerciseTime" onChange={handleExerciseChange}></input>
          Break
          <input name="breakTime" onChange={handleExerciseChange}></input>
        </p>
        <button onClick={handleExerciseSubmit}>Save</button>
        <button>Edit</button>
        <input id="exerciseDelete"></input>
        <button onClick={handleDeleteExercise}>Delete</button>
      </form>
      <button onClick={handleGetExercises}>Get Exercise</button>
      <h1>Calories</h1>
      <p>{state.calories}</p>
      <button onClick={handleGetCalories}>Get Calories</button>
      <input id="caloriesBurned"></input>
      <button onClick={handleCaloriesSubmit}>Send Calories</button>
      <button
        onClick={() => {
          dispatch(logOut());
        }}
      >
        Log Out
      </button>
      <button onClick={handlePopupToggle}>PopUp</button>
      {isPopupOpen && (
        <Popups
          handleClose={handlePopupToggle}
          content={
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
              commodi ducimus optio ipsa reiciendis illum eos magnam nemo natus,
              atque excepturi explicabo! Ipsum blanditiis deserunt laboriosam
              mollitia, distinctio ad saepe aliquam sunt ex, laborum atque nihil
              velit maxime. Esse sint ipsam excepturi ipsa reiciendis aliquam
              atque, voluptatibus quo illum minima. Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Voluptas commodi ducimus optio ipsa
              reiciendis illum eos magnam nemo natus, atque excepturi explicabo!
              Ipsum blanditiis deserunt laboriosam mollitia, distinctio ad saepe
              aliquam sunt ex, laborum atque nihil velit maxime. Esse sint ipsam
              excepturi ipsa reiciendis aliquam atque, voluptatibus quo illum
              minima. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptas commodi ducimus optio ipsa reiciendis illum eos magnam
              nemo natus, atque excepturi explicabo! Ipsum blanditiis deserunt
              laboriosam mollitia, distinctio ad saepe aliquam sunt ex, laborum
              atque nihil velit maxime. Esse sint ipsam excepturi ipsa
              reiciendis aliquam atque, voluptatibus quo illum minima. Lorem
              ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
              commodi ducimus optio ipsa reiciendis illum eos magnam nemo natus,
              atque excepturi explicabo! Ipsum blanditiis deserunt laboriosam
              mollitia, distinctio ad saepe aliquam sunt ex, laborum atque nihil
              velit maxime. Esse sint ipsam excepturi ipsa reiciendis aliquam
              atque, voluptatibus quo illum minima. Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Voluptas commodi ducimus optio ipsa
              reiciendis illum eos magnam nemo natus, atque excepturi explicabo!
              Ipsum blanditiis deserunt laboriosam mollitia, distinctio ad saepe
              aliquam sunt ex, laborum atque nihil velit maxime. Esse sint ipsam
              excepturi ipsa reiciendis aliquam atque, voluptatibus quo illum
              minima. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptas commodi ducimus optio ipsa reiciendis illum eos magnam
              nemo natus, atque excepturi explicabo! Ipsum blanditiis deserunt
              laboriosam mollitia, distinctio ad saepe aliquam sunt ex, laborum
              atque nihil velit maxime. Esse sint ipsam excepturi ipsa
              reiciendis aliquam atque, voluptatibus quo illum minima.
            </p>
          }
        ></Popups>
      )}
      <RadialProgressBar
        numerator={11}
        denominator={10}
        title={"How Much I Ate Today"}
      />
    </div>
  );
}
export default Try;
