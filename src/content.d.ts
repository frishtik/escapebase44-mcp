/** One topic about EscapeBase44: its MCP tool name, title, one-line description and lines of text. */
export interface Section {
  tool: string;
  title: string;
  description: string;
  lines: string[];
}
/** EscapeBase44's website, where a Base44 migration starts. */
export declare const site: string;
/** What EscapeBase44 is and does, one section per topic. */
export declare const sections: Section[];
/** One section as plain text: its title, then its lines. */
export declare function sectionText(s: Section): string;
/** Everything this package says about EscapeBase44, as one text. */
export declare function allText(): string;
