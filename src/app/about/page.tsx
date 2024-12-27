export default function About() {
  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex flex-col gap-4 text-lg">
        <p>
          This is a hobby project by{" "}
          <a href="https://chengdai.dev" target="_blank" className="underline">
            Cheng Dai
          </a>{" "}
          to help people find official inspection results for restaurants in
          Stockholm.
        </p>
        <p>
          The data is sourced from the official website of{" "}
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
          If you have any questions or feedback, please contact me{" "}
          <a href="mailto:revers.barkeeper47@icloud.com" className="underline">
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
