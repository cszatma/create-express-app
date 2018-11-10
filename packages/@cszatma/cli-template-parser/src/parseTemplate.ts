export interface TemplateOptions {
  extend: string;
  replace: string | string[];
}

export interface Template {
  content: string;
  options?: TemplateOptions;
}

export default function parseTemplate(template: string): Template {
  const optionsRegex = /@options([^]*?)@end/g;

  const rawOptions = template.match(optionsRegex);
  const content = template.replace(optionsRegex, '').trim();

  // If no options just return the content
  if (!rawOptions) {
    return { content };
  }

  if (rawOptions.length > 1) {
    throw SyntaxError('@options may only be used once!');
  }

  // Remove the @options and @end tags
  const options = rawOptions[0].replace(/(@options|@end)/g, '');

  return {
    content,
    options: JSON.parse(options),
  };
}
