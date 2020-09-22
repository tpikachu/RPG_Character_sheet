import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { CCharacter } from "../../model/character";

@Component({
  selector: "app-character-sheet",
  templateUrl: "./character-sheet.component.html",
  styleUrls: [ "./character-sheet.component.css" ]
})
export class CharacterSheet implements OnInit {
  character: CCharacter;
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.character = new CCharacter({} as any);
  }

  updateMainAttribute(event): void {
    const { name, value } = event.target;
    this.character.setMAttrValue(name, parseInt(value));
  }

  renewSkillValue(sKey): void {
    this.character.renewSkillValueBySkey(sKey);
  }

  import(event): void {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const rawString = event.target.result.toString();
      const json = JSON.parse(window.atob(rawString.split("data:application/json;base64,")[1]));
      this.character = new CCharacter(json);
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  export(): void {
    const data = this.character.toObject();
    let filename = this.character.name;
    if (!filename || filename === "") {
      alert("Error: Name shouldn't be empty");
      return;
    }
    if (!data) {
      alert("Console.save: No data");
      return;
    }

    filename += ".json";

    let rawData = JSON.stringify(data, undefined, 4);

    var blob = new Blob([ rawData ], { type: "text/json" }),
      e = document.createEvent("MouseEvents"),
      a = document.createElement("a");

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = [ "text/json", a.download, a.href ].join(":");
    e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
}
