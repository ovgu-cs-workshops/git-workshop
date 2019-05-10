import { Component, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ChapterComponent } from '../chapter/chapter.component';

@Component({
  selector: 'slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements AfterViewInit {
  @ViewChildren(ChapterComponent) private _chapters: QueryList<ChapterComponent>;

  private chapter = 0;

  constructor(private _changeDetector: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    const arr = this._chapters.toArray();
    let position = 0;
    for (let pos = 0; pos < this._chapters.length; pos++) {
      arr[pos].chapterSubject.next(this.chapter++);
      arr[pos].change();
      if (arr[pos - 1]) {
        arr[pos].prevOrder = arr[pos - 1].prevOrder + arr[pos - 1].order;
        arr[pos].prevOrderSubject.next(arr[pos].prevOrder);
      } else {
        arr[pos].prevOrder = 0;
        arr[pos].prevOrderSubject.next(arr[pos].prevOrder);
      }

      position = arr[pos].assignSlidePositions(position);
    }

    this._chapters.forEach(chap => {
      chap.setSlideCount(position);
    });

    this._changeDetector.detectChanges();
  }

  public whatIsATag(config: any): void {
    config.template.commit.widthExtension = 0;
    const graph = new GitGraph({
      ...config
    });
    (<any> graph).template.commit.tag.spacingX = 70;
    const master = graph.branch('master');
    master.commit({
      messageBranchDisplay: false,
      message: 'Initial commit',
    });
    master.commit({
      messageBranchDisplay: false,
      message: 'Add fancy code',
    });
    master.commit({
      messageBranchDisplay: false,
      message: 'Add documentation',
    });
    master.tag('v0.1.0');
    master.commit({
      messageBranchDisplay: true,
      message: 'Fix major bugs',
    });

    console.log(graph);
  }

  public howAMergeWorks(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch('master');
    master.commit({
      message: 'Fix compiler errors',
      messageBranchDisplay: false,
    });
    const logging = master.branch('logging');
    logging.commit({
      message: 'Add logging to application',
      messageBranchDisplay: false,
    });
    master.commit({
      message: 'Add translation to german',
      messageBranchDisplay: false,
    });
    logging.commit({
      message: 'Add support for log-levels',
      messageBranchDisplay: true,
    });
    logging.merge(master);
  }

  public gitFlowWorkflow(config: any): void {
    const graph = new GitGraph({
      ...config,
    });
    const master = graph.branch('master');
    master.commit({
      message: 'Initial commit',
      messageBranchDisplay: false,
    });
    const develop = master.branch(<any> {
      name: 'develop',
      column: 2
    });
    develop.commit({
      message: 'Start development',
      messageBranchDisplay: false,
    });
    const feature = develop.branch(<any> {
      name: 'feature/new-chapter',
      column: 3
    });
    feature.commit('Add new chapter');
    develop.commit({
      message: 'Fix spelling',
      messageBranchDisplay: false,
    });
    feature.merge(develop, { messageBranchDisplay: false, });
    const release = develop.branch(<any> {
      name: 'release-v0.1.0',
      column: 1
    });
    release.commit('Prepare for release');
    develop.commit('Start new story');
    release.merge(master);
    master.tag('v0.1.0');
  }

  public topicBranches(config: any): void {
    const graph = new GitGraph(config);
    const master = graph.branch(<any> {
      name: 'master',
      column: 1
    });
    master.commit({
      message: 'Initial commit',
      messageBranchDisplay: false,
    });
    const feature = master.branch(<any> {
      name: 'feature/introduction',
      column: 2,
    });
    const f2 = master.branch(<any> {
      name: 'feature/agenda',
      column: 0
    });
    feature.commit({
      message: 'Add introduction',
      messageBranchDisplay: false,
    });
    f2.commit('Add fancy agenda');
    feature.commit('Fix spelling');
    feature.merge(master, { messageBranchDisplay: false, });
    f2.merge(master);
  }

  public central(config: any): void {
    const graph = new GitGraph({
      ...config,
      orientation: 'vertical-reverse',
    });
    const master = graph.branch('master');
    master.commit({
      message: 'Initial commit',
      messageBranchDisplay: false,
    });
    master.commit({
      message: 'Add cool feature',
      messageBranchDisplay: false,
    });
    master.commit('And even more');
  }
}
