import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { legalEntity, legalNav, type InlinePart, type LegalBlock, type LegalDocument } from "@/lib/legal";
import { cn } from "@/lib/utils";

function RichText({ parts }: { parts: InlinePart[] }) {
  return parts.map((part, index) => {
    if (typeof part === "string") return <span key={index}>{part}</span>;

    const className =
      "underline decoration-primary/25 underline-offset-4 transition-colors hover:text-secondary hover:decoration-secondary";

    if (part.external) {
      return (
        <a className={className} href={part.href} key={index} rel="noreferrer" target="_blank">
          {part.text}
        </a>
      );
    }

    if (part.href.startsWith("mailto:") || part.href.startsWith("tel:")) {
      return (
        <a className={className} href={part.href} key={index}>
          {part.text}
        </a>
      );
    }

    return (
      <Link className={className} href={part.href} key={index}>
        {part.text}
      </Link>
    );
  });
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "h3") {
    return <h3 className="type-h6 mt-8 text-foreground">{block.text}</h3>;
  }

  if (block.type === "list") {
    return (
      <ul className="mt-4 grid gap-2 pl-5">
        {block.items.map((item, index) => (
          <li className="list-disc type-body text-foreground/88 marker:text-secondary" key={index}>
            <RichText parts={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "table") {
    return (
      <div className="mt-6 overflow-x-auto border border-primary/12">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="bg-primary text-primary-foreground">
            <tr>
              {block.headers.map((header) => (
                <th className="px-4 py-3 text-xs font-semibold tracking-wide" key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr className="border-t border-primary/12 align-top" key={row[0]}>
                {row.map((cell, index) => (
                  <td className="px-4 py-3 type-body-sm text-foreground/88" key={index}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <p className="type-body mt-4 text-foreground/88">
      <RichText parts={block.parts} />
    </p>
  );
}

export function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <header className="border-b border-primary/12 bg-[#fdf8f0]">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
          <p className="mono-label text-secondary">Legal / Greece</p>
          <h1 className="type-h1 mt-6 max-w-4xl">{document.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Transparent, secure, and built for trust. Written for businesses that work with KRS in Greece.
          </p>
          <p className="type-body-sm mt-4 text-muted-foreground">
            {legalEntity.name}
            <span className="px-2 text-primary/30">/</span>
            Last updated {document.updated}
          </p>
          <nav aria-label="Legal documents" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-primary/12 pt-5">
            {legalNav.map((item) => {
              const current = item.href === document.href;
              return (
                <Link
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    current ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                  href={item.href}
                  key={item.href}
                >
                  <span className={cn("border-b pb-1", current ? "border-secondary" : "border-transparent")}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-between lg:px-12 lg:py-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="mono-label text-muted-foreground">On this page</p>
          <nav aria-label="Sections" className="mt-4 grid gap-2">
            {document.sections.map((section) => (
              <a
                className="text-sm leading-6 text-foreground/72 transition-colors hover:text-foreground"
                href={`#${section.id}`}
                key={section.id}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article>
          {document.sections.map((section) => (
            <section className="scroll-mt-28 border-t border-primary/12 py-8 first:border-t-0 first:pt-0" id={section.id} key={section.id}>
              <h2 className="type-h4">{section.title}</h2>
              {section.blocks.map((block, index) => (
                <Block block={block} key={index} />
              ))}
            </section>
          ))}

          <section className="scroll-mt-28 border-t border-primary/12 py-8" id="contact">
            <h2 className="type-h4">Contact</h2>
            <p className="type-body mt-4 text-foreground/88">
              For privacy questions, rights requests, or questions about these terms, contact:
            </p>
            <div className="mt-6 border border-primary/12 bg-[#fdf8f0] px-5 py-5">
              <p className="text-sm font-semibold">{legalEntity.name}</p>
              <p className="type-body-sm mt-3 text-foreground/80">
                {legalEntity.address.map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </p>
              <p className="type-body-sm mt-3">
                <a className="underline decoration-primary/25 underline-offset-4 hover:text-secondary" href={`mailto:${legalEntity.email}`}>
                  {legalEntity.email}
                </a>
                <span className="px-2 text-primary/30">/</span>
                <a className="underline decoration-primary/25 underline-offset-4 hover:text-secondary" href={legalEntity.phoneHref}>
                  {legalEntity.phone}
                </a>
              </p>
            </div>
          </section>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
