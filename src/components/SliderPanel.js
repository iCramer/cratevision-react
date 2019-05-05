import React, { Component } from 'react';
import classnames from 'classnames';

import { Button, Tabs } from './core';

export class SliderPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: null,
      tabs: [],
      tabContent: []
    }
  }

  getClassSet() {
    return classnames('slider-panel', { 'open': this.props.open, 'slider-panel-nav': this.state.tabs.length });
  }

  tabClick = (tabKey) => {
    this.setState({ activeTab: tabKey });
  }

  renderTabs() {
    let tabs = [];
    let tabContent = [];
    let activeTab;
    let children = React.Children.toArray(this.props.children);

    children.forEach( child => {
      if (child.type.name === 'Tab') {
        tabs.push({label: child.props.title, tabKey: child.props.tabKey});
        tabContent.push({tabKey: child.props.tabKey, content: child.props.children});
        if (child.props.active) {
          activeTab = child.props.tabKey;
        }
      }
    });
    if (!activeTab) {
      activeTab = children[0].props.tabKey || null;
    }
    this.setState({ tabs: tabs, tabContent: tabContent, activeTab: activeTab });
  }

  componentDidMount() {
    this.renderTabs();
  }

  getActiveContent(tab) {
    if (tab.tabKey === this.state.activeTab) {
      return tab.content;
    }
    else {
      return null;
    }
  }

  render() {
    return (
        <section className={this.getClassSet()}>
          <header className="slider-panel-header">
            <h5 className="slider-panel-title">{this.props.title}</h5>
            <Button className="slider-panel-close" size="sm" linkBtn onClick={this.props.closePanel} icon="times" />
            { this.state.tabs.length &&
              <Tabs links={this.state.tabs} activeTab={this.state.activeTab} clickHandler={this.tabClick} />
            }
          </header>
          <div className="slider-panel-body">
            { this.state.tabContent.length &&
              this.state.tabContent.map( tab => {
                return this.getActiveContent(tab);
              })
            }
            {this.props.children}
          </div>
        </section>
    )
  }
}
