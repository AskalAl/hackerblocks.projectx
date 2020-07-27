import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias, equal } from '@ember/object/computed';

export default class ContestDefaultView extends Component {
  @service store
  @service router
  @alias('fetchContentsTask.lastSuccessful.value') contents

  didReceiveAttrs() {
    this.fetchContentsTask.perform()
  }

  queryParams = ['offset', 'limit', 'status', 'difficulty', 'tags', 'q']
  offset = 0
  limit = 10
  difficulty = []
  tags = []
  q = ''

  @computed('offset', 'limit')
  get page() {
    return {
      offset: this.offset,
      limit: this.limit
    }
  }
  @computed('status','difficulty','tags', 'q')
  get filter() {
    return {
      status: this.status,
      difficulty: {
        $in: this.difficulty
      },
      tags: {
        id: {
          $in: this.tags
        }
      },
      name: {
        $iLike: `%${this.q}%`
      }
    }
  }

  @action
  setOffset(offset) {    
    this.set('offset', offset)
    this.fetchContentsTask.perform()
  }

  @action
  searchProblem(query) {
    this.set('q', query)
    this.fetchContentsTask.perform()
  }

  @restartableTask fetchContentsTask = function *() {    
    try {
      return yield this.store.query('content', { 
        filter: this.filter,        
        page: this.page,
        contest_id: this.contest.id
      })
    } catch (err) {
      console.log(err)
      this.set('showError', true)
    }
  }
};
