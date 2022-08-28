import { For } from "solid-js";
import { stats } from "./App";
import Languages from "./Languages";

export interface Res {
  origin: string;
  stats: Array<[string, Stat]>;
  total: Stat;
}

export interface Stat {
  files: number;
  lines: number;
  codes: number;
  comments: number;
  blanks: number;
}

export const empty_stat:Stat = {
  files: 0,
  lines: 0,
  codes: 0,
  comments: 0,
  blanks: 0
}

export default function Layout() {
  //   arr_stat.sort((a, b) => b[1].lines - a[1].lines);

  if (stats().origin == "") {
    return <div></div>;
  } else {
    return (
      <div>
        <p class='repository'>{stats().origin}</p>
        <table>
          <thead>
            <tr>
              <th>Language</th>
              <th>file</th>
              <th>line</th>
              <th>code</th>
              <th>comment</th>
              <th>blank</th>
            </tr>
          </thead>
          <tbody>
            <For each={stats().stats}>
              {(stat) => (
                <tr>
                  {Languages(stat[0])}
                  <td>{stat[1].files}</td>
                  <td>{stat[1].lines}</td>
                  <td>{stat[1].codes}</td>
                  <td>{stat[1].comments}</td>
                  <td>{stat[1].blanks} </td>
                </tr>
              )}
            </For>
            <tr class='total'>
              <td>Total</td>
              <td>{stats().total.files}</td>
              <td>{stats().total.lines}</td>
              <td>{stats().total.codes}</td>
              <td>{stats().total.comments}</td>
              <td>{stats().total.blanks}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
