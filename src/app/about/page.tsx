export default function About() {
  return (
    <div className="max-w-screen-md mx-auto mt-20">
      <div className="flex flex-col gap-4 text-lg">
        <p>
          This is an ongoing side project by{" "}
          <a href="https://chengdai.dev" target="_blank" className="underline">
            Cheng Dai
          </a>{" "}
          to help people find official inspection results for restaurants in
          Stockholm stad, to make sure the food is safe to eat.
        </p>
        <p>
          The data is sourced from{" "}
          <a
            href="https://etjanster.stockholm.se/livsmedelsinspektioner/"
            target="_blank"
            className="underline"
          >
            Stockholm Livsmedelsinspektioner
          </a>
          .
        </p>
        <p>
          If you have any suggestions or feedback, feel free to contact me{" "}
          <a href="mailto:revers.barkeeper47@icloud.com" className="underline">
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
