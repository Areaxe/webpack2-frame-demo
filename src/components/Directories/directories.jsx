
import React, {Component} from "react";
import {Link} from "react-router";
import classnames from "utils/classnames.js";
import ReactDOM from "react-dom";
import data from "./data.js";

export default class Directories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleNode = this.toggleNode.bind(this);
    this.selectedDoc = this.selectedDoc.bind(this);
    this.indent = "15";
  }

  compomentDidMount(){
    
  }

  toggleNode(nodeId, event) { //  展开闭合目录效果
    this.setState({
      [nodeId]: !this.state[nodeId]
    });
  }

  selectedDoc(docId) {
    this.setState({ selectedId: docId });
  }

  renderChildren(childList, selectedId, parentId, ifShow = false, floor = 1) {
    const showcur = this.state[parentId] || ifShow || floor <= 0; //  if parent is Selected or it is zero floor or parent want him show
    return <ul className={ showcur ? "document-block" : "document-hide" }>
      {
        childList.map(item => {
          let isDirectiore = item.contentHtml ? false : true;
          let hasChild = item.children && item.children.length;
          const style = {
            paddingLeft: floor * this.indent + "px"
          };
          return <li className="directories-item" key={item.id} ref={item.id}>
            {
              isDirectiore ? <div className="directoire" style={style}>
                  <div onClick={(e) => this.toggleNode(item.id, e)}>{item.title}</div>
                  {
                    hasChild ? <span
                      className={(this.state[item.id]) ? "arrow arrow-down" : "arrow"}
                      onClick={(e) => this.toggleNode(item.id, e)}>
                      &rsaquo;
                    </span>
                    : null
                  }
                </div> : <div className={selectedId === item.id ? "title selected" : "title"} style={style}>
                <div onClick={(e) => this.selectedDoc(item.id, e)}>{item.title}</div>
              </div>
            }
            {
              hasChild ? this.renderChildren(item.children, selectedId, item.id, item.contentHtml, floor + 1) : null
            }
          </li>;
        })
      }
    </ul>;
  }

  render() {
    const {directorie, selected, indent } = this.props;
    const selectedId = this.state.selectedId || selected;
    return <ul>
      <li>
        {this.renderChildren([directorie], selectedId, directorie.id, true, 0)}
      </li>
    </ul>;
  }
}