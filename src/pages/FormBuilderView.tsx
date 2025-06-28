import FormBuilder from "@/components/FormBuilder/FormBuilder";
import Layout from "@/components/Layout";
import type { SubmitProps } from "@/interface";
import { formConfig as formConfigData } from "@/utils";
import React, { useState } from "react";

const FormBuilderView: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<
    SubmitProps["formData"] | null
  >(null);

  const handleSubmit = (data: SubmitProps["formData"]) => {
    setSubmittedData(data);
  };

  return (
    <React.Fragment>
      <Layout>
        <div className="px-4 sm:px-0 py-1 w-full">
          <h1 className="text-2xl font-bold mb-6">Dynamic Form Builder</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Form</h2>
              <FormBuilder config={formConfigData} onSubmit={handleSubmit} />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Submitted Data</h2>
              {submittedData ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 overflow-auto">
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-gray-500">No data submitted yet</p>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default FormBuilderView;
