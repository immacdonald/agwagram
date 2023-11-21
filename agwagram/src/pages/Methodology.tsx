function Methodology() {
  return (
    <div>
      <h1>
        About <em>Agwagram</em>
      </h1>
      <p>
        Agwagram is built on top of BLOC, or Behavioral Language for Online
        Classification, a language that represents social media account
        behaviors, including both benign and malicious ones. It is not limited
        to human behavior, but can also capture the behaviors of cyborgs and
        bots. BLOC represents online activities as BLOC words, consisting of
        symbols drawn from different alphabets to indicate the temporality of
        actions or forms of content.
      </p>
      <br />
      <p>
        The BLOC language is flexible and generalizable, and can be used to
        detect suspicious behaviors without requiring specific fine-tuning. This
        is in contrast to other methods that rely on features designed to target
        specific types of malicious behaviors, which may not generalize well to
        other types. BLOC can represent a broad range of legitimate and
        suspicious behaviors, making it a versatile tool for studying and
        detecting social media account behaviors.
      </p>
      <br />
      <p>
        BLOC outperforms previous state-of-the-art methods for detecting bot
        coordinated behavior in terms of efficiency and accuracy, while using
        significantly fewer features. For more information, please see the BLOC
        paper:{" "}
        <a href="https://arxiv.org/abs/2211.00639">
          A General Language for Modeling Social Media Account Behavior
        </a>{" "}
        as well as the{" "}
        <a href="https://github.com/anwala/bloc">BLOC Project GitHub.</a>
      </p>
    </div>
  );
}

export default Methodology;
