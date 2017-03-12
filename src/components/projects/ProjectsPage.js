import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as projectAction from '../../actions/createProjectAction';
import * as loadProjectsAction from '../../actions/loadProjectsAction';
import {bindActionCreators} from 'redux';
import ProjectList from './ProjectList';

class ProjectsPage extends Component{
  constructor(props){
    super(props);
    //Init state
    this.state = {
      project: {title: ''}
    };
    // Bind functions to this
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  // === Child functions ===
  onTitleChange(event) {
    const project = this.state.project;
    project.title = event.target.value;
    this.setState({
      project: project
    });
  }

  onClickSave() {
    //this.props.actions.createProject(this.state.project);
  }

  projectRow(project, index){
    return <div key={index}>{project.title}</div>;
  }
  // === Render ===
  render(){
    const {projects} = this.props;
    return(
      <div>
        <h1>Projects</h1>
        <ProjectList projects={projects}/>
        {/*{this.props.projects.map(this.projectRow)}*/}
        <h2>Add project</h2>
        <div className="myform">
          <div className="form-group">
            <input type="text" onChange={this.onTitleChange} value={this.state.project.title} className="form-control"/>
          </div>
          <div className="form-group">
            <input type="submit" value="Save" onClick={this.onClickSave} className="btn btn-info btn-block"/>
          </div>
        </div>
      </div>
    );
  }
}

// === Prop Type validation ===
ProjectsPage.propTypes = {
  projects: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// === Redux Part ====
function mapStateToProps(state, ownProps){
  // state from redux store
  return {
    projects: state.projects // projects property is coming from rootReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loadProjectsAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
