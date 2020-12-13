<ul className="tasks-section__list" id="tasks-list">
          {this.state.tasks.map((task) =>
            <li key={task.id} className="task">{task}<button class="btn btn--red">Remove</button></li>
          )}
          </ul>