import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Map from './components/Map';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="main">
        <Scene
          onRight={() => Actions.employeeCreate()}
          rightTitle="Add"
          key="employeeList"
          component={Map}
          title="Employees"
          initial
        />
      </Scene>
    </Router>
  );
};

// <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
// <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />

export default RouterComponent;
