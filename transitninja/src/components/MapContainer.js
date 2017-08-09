import {connect} from 'react-redux';
import Map from './Map';

const mapStateToProps = ({projects}) => {
  return {
    allProjects: selectAllProjects(projects)
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProjects: ()=>dispatch(fetchProjects()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectIndex);
