import React from 'react';
import { Tasks } from '../api/Tasks';
import classnames from 'classnames';

export default class Task extends React.Component {
  togglePrivate() {
      Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
  }

  deleteTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  toggleChecked() {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  render() {
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private
    });

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteTask.bind(this)}>
          &times;
        </button>

        <input type="checkbox" readOnly checked={this.props.task.checked} onClick={this.toggleChecked.bind(this)}/>

        {this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            {this.props.task.private ? 'Private' : 'Public'}
          </button> ) : ''
        }

        <span className="text"><strong>{this.props.task.username}</strong>: {this.props.task.text}</span>
      </li>
    );
  }
}

Task.propTypes = {
  task: React.PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired
};
