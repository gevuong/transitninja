import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Map from './components/Map';
import WelcomePage from './components/WelcomePage';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="main">
        <Scene
          key="welcome"
          component={WelcomePage}
          hideNavBar
        />
        <Scene
          hideNavBar
          key="mapPage"
          component={Map}
          initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;


// Reference:
//
// import React from 'react';
// import { Scene, Router, Actions } from 'react-native-router-flux';
// import LoginForm from './components/LoginForm';
// import EmployeeList from './components/EmployeeList';
// import EmployeeCreate from './components/EmployeeCreate';
// import EmployeeEdit from './components/EmployeeEdit';
//
// const RouterComponent = () => {
//   return (
//     <Router sceneStyle={{ paddingTop: 65 }}>
//       <Scene key="auth">
//         <Scene key="login" component={LoginForm} title="Please Login" />
//       </Scene>
//
//       <Scene key="main">
//         <Scene
//           onRight={() => Actions.employeeCreate()}
//           rightTitle="Add"
//           key="employeeList"
//           component={EmployeeList}
//           title="Employees"
//           initial
//         />
//         <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
//         <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
//       </Scene>
//     </Router>
//   );
// };
