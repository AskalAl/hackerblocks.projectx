import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service store
  @service router

  queryParams = ['status', 'difficulty', 'tags']
  difficulty = []
  tags = []


  @computed('contest.currentAttempt')
  get nextRoute() {
    return 'contests.contest.attempt'
  }

  @action
  handleUnverifiedEmail(code) {
    this.transitionToRoute('error', {
      queryParams: {
        errorCode: code,
        next: this.router.get('currentURL')
      }
    })
  }
  @action
  onAfterCreate() {
    this.transitionToRoute('contests.contest.attempt')
  }
}
