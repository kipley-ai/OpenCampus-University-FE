import Image from "next/image";
import MainBanner from "@/public/images/grants-fund-main-banner.svg";

export function AcademicGrantsFundPage() {
  return (
    <div>
      <div
        className="h-[300px] w-full rounded-t-xl bg-cover bg-center px-8 py-6 md:h-[350px] xl:h-[455px]"
        style={{
          backgroundImage: `url(${MainBanner.src})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-4xl font-bold uppercase text-white sm:text-5xl">
          The Open Campus University
        </h1>
        <h1 className="text-4xl font-bold uppercase text-[#02EEC4] sm:text-5xl">
          Academic Grants Fund
        </h1>
      </div>
      <article className="rounded-b-xl border-x border-b border-border px-4 py-8 sm:px-16 sm:py-16 xl:px-28">
        <div className="flex flex-col items-center gap-8 xl:flex-row xl:items-start">
          <div className="max-xl:w-full xl:w-[55%]">
            <h2 className="text-xl font-medium">
              We are proud to announce the launch of the Open Campus University
              Academic Grants Fund, a USD 10M fund intended to help spur the
              adoption of educational AI across the globe.
            </h2>
            <p className="mt-6 text-xs text-body">
              OCU research grants of up to $10,000 and fellowships of up to
              $30,000 will be awarded to assist educators in making their
              courses AI-ready. Grants are available to researchers and
              educators in all fields.
            </p>
          </div>
          <Image
            src="/images/grants-fund-coins.svg"
            alt="Grants Fund Coins"
            className="mx-8 w-4/5 md:w-3/5 xl:w-[45%]"
            width={429}
            height={184}
          />
        </div>

        <h2 className="mt-8 text-xl font-medium">The Open Campus U Platform</h2>
        <p className="mt-4 text-xs text-body">
          Our goal in starting the OCU Academic Grants fund is to encourage
          critical thinking and thoughtful adoption of AI in education. Students
          are already using AI in their academic work, and our goal is to
          provide frameworks within which they can do this safely, legally and
          creatively. We believe that AI can become a way for students to
          multiply their own capacities, rather than simply to complete
          assignments on their behalf.
        </p>
        <p className="mt-4 text-xs text-body">
          For this purpose we created the Open Campus U platform, a
          decentralised and easy-to-use AI integration system. Educators can
          securely upload copyrighted materials without any risk that their
          intellectual property will be used to train future closed-source
          models. With just a few clicks, they can then create custom apps to
          accompany their course materials, whether these are quiz generator AI
          apps, semantic search citation management systems, or just a simple AI
          chatbot for asking questions about the syllabus.
        </p>

        <h2 className="mt-8 text-xl font-medium">Requirements</h2>
        <p className="mt-4 text-xs text-body">
          Coming from an academic background ourselves, we are well aware of how
          opaque grant funding can often be. In designing the OCU grant
          programme, we have worked to make the application process as simple
          and transparent as possible. Funding may be used for any research
          project in all fields. Rather than being contingent upon future
          research outcomes, funding depends primarily upon the number of
          courses companion materials applicants are able to upload to the
          platform and the number of students these courses are projected to
          attract.
        </p>
        <p className="mt-4 text-xs text-body">
          To apply for grant funding (up to $10,000) an educator must commit to
          upload at least two current taught courses with existing students. To
          apply for a fellowship (up to $30,000) an educator must commit to
          upload at least three current taught courses with existing students.
          In both cases the final 20% of the funding amount is contingent upon
          the courses attracting the projected number of students.
        </p>
        <p className="mt-4 text-xs text-body">
          Applications will be assessed by the Grant Committee based on:
          <ul className="ml-6 mt-2 list-outside list-disc space-y-1">
            <li>
              Subject matter expertise e.g. applicant's qualifications, track
              record, past experience.
            </li>
            <li>
              Content suitability e.g. whether the content is fit for students
            </li>
            <li>Potential reach of finished course</li>
            <li>Overall completeness of the application.</li>
            <li>
              Overall balance of Subject Matters covered by OCU: We aim to have
              courses that are in Technology, Humanities & the Arts, Business.
            </li>
            <li>
              Geographical base: We aim to be aiding and onboarding applicants
              from all over the world.
            </li>
            <li>
              Size of applicant's student base e.g. size of the applicant's
              potential student population that will also be onboarded through
              to access the courses published on OCU
            </li>
            <li>
              Additional factors including the subjects chosen by applicants,
              and their capability to teach at the academic level selected. The
              Committee shall also assess the alignment of applicants' proposals
              with market dynamics, ensuring their ideas resonated with the
              evolving needs and preferences of the target audience. The
              thorough evaluation aimed to uncover each candidate's potential
              and determine their suitability for the selection process, driven
              by the commitment to maintain high standards and make informed
              decisions.
            </li>
          </ul>
        </p>

        <h2 className="mt-8 text-xl font-medium">Relevant Documents</h2>
        <div className="mt-4 flex flex-col gap-2">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeQhJqvQ6LxGQEl2g-CHlIDCisFLidqeFlSNwcLfN3TG7_JXA/viewform"
            className="text-xs text-primary underline hover:text-secondary"
            target="_blank"
            rel="noreferrer noopener"
          >
            Fellowship Application (up to $30k)
          </a>
          <a
            href="https://docs.google.com/forms/u/4/d/e/1FAIpQLSfg4FleWGY8pQ96ys8Nic_BWKYe_7RzsK_H3PNe8o-x24zfgw/viewform"
            className="text-xs text-primary underline hover:text-secondary"
            target="_blank"
            rel="noreferrer noopener"
          >
            Grant Application (up to $10k)
          </a>
          <a
            href="https://kipprotocol.docsend.com/view/3ervkgycdtyi8zj6"
            className="text-xs text-primary underline hover:text-secondary"
            target="_blank"
            rel="noreferrer noopener"
          >
            Terms and Conditions
          </a>
        </div>
      </article>
    </div>
  );
}
