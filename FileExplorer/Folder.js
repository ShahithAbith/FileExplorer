import { useState } from "react";
import explorer from "../data/folderData";

export function Folder({ handleNewTree, explorerData }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder
    });
  };

  const createFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleNewTree(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorerData.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁{explorerData.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder + </button>
            <button onClick={(e) => handleNewFolder(e, false)}>File + </button>
          </div>
        </div>
        <div
          className=""
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"} </span>
              <input
                type="text"
                className="input"
                autoFocus
                onKeyDown={createFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorerData.items.map((exp, i) => (
            <Folder
              handleNewTree={handleNewTree}
              key={exp.id}
              explorerData={exp}
            />
            // <span key={exp.id}>{exp.name}</span>
          ))}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorerData.name}</span>;
  }
}
