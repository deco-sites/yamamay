import PreactMarkdown from "preact-markdown";
import remarkGfm from "remark-gfm";
import type { HTML } from "deco-sites/std/components/types.ts";

export interface Props {
  /**
   * @title Texto
   * @description Texto em linguagem Markdown a ser mostrado (confira o seguinte guia caso tenha dúvidas de como funciona o Markdown: https://www.markdownguide.org/cheat-sheet/)
   */
  text?: HTML;
}

function RichText({ text }: Props) {
  if (!text || !text?.length) {
    return <></>;
  }

  return (
    <PreactMarkdown remarkPlugins={[remarkGfm]}>
      {text}
    </PreactMarkdown>
  );
}

export default RichText;
