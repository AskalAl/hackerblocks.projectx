import Route from '@ember/routing/route';

export default class ContestIndexRoute extends Route {
  queryParams = {
    offset: {
      refreshModel: false
    },
    limit: {
      refreshModel: false
    },
    difficulty: {
      refreshModel: false
    },
    status: {
      refreshModel: false
    }
  }

  model() {
    return this.modelFor('contests.course.contest')
  }

  setupController(controller, model) {
    controller.set('course_contest', model.course_contest)
    controller.set('contest', model.contest)
  }
}
