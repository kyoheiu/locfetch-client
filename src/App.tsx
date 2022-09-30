import { createResource, createSignal, Show } from "solid-js";

import { empty_stat, Res } from "./Layout";
import Layout from "./Layout";

export const [stats, setStats] = createSignal<Res>({
  origin: "",
  stats: [],
  total: empty_stat,
});
const [url, setUrl] = createSignal("");
const [errMessage, setErrMessage] = createSignal("");
const local = import.meta.env.VITE_URL;

const fetch_data = async (url: string) => {
  setErrMessage("");
  setStats({
    origin: "",
    stats: [],
    total: empty_stat,
  });
  if (url.length == 0) {
    return;
  } else {
    const res = await fetch(local, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ url: url.trim() }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      setStats({
        origin: "",
        stats: [],
        total: empty_stat,
      });
      setErrMessage(await res.text());
    } else {
      const j = await res.json();
      console.log(j);
      setStats(() => j);
    }
    var inputField = document.getElementById("urlform");
    if (inputField !== null) {
      (inputField as HTMLTextAreaElement).value = "";
    }
  }
};

const [loading] = createResource(url, fetch_data);

const App = () => {
  return (
    <>
      <main>
        <h1>Count the lines of code online.</h1>
        <p>
          Enter the remote repository URL.
          <br />
          (e.g. https://github.com/username/project)
        </p>
        <input id='urlform' />
        &nbsp;
        <button
          onclick={() =>
            setUrl(
              (document.getElementById("urlform")! as HTMLTextAreaElement).value
            )
          }
        >
          Count
        </button>
        <p>{loading.loading && "Loading..."}</p>
        <Show
          when={errMessage().length == 0}
          fallback={
            <div>
              {url}
              <br />
              {errMessage}
            </div>
          }
        >
          {Layout()}
        </Show>
      </main>
      <footer>
        {import.meta.env.VITE_VERSION}
        <br />
        <a href='https://github.com/kyoheiu'>github.com/kyoheiu</a> ·{" "}
        <a href='https://ko-fi.com/P5P6C4FF2'>Support me on Ko-fi☕</a>
      </footer>
    </>
  );
};
export default App;
