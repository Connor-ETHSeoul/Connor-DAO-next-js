'use client';

import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { NextPage } from 'next';
import { ConnorDAOButton } from '@/components/MainButton';
import { ButtonSize, ButtonType } from '@/types/ButtonType';

const NewPolicy: NextPage = () => {
  const [value, setValue] = useState('**Hello world!!!**');
  const [title, setTitle] = useState('');
  const [policy, setPolicy] = useState('');
  return (
    <div className="newPolicyContainer mx-[24%] mt-[31px] flex flex-col gap-[30px]">
      <div className="newPolicyHeader flex justify-between">
        <div className="text-[24px] font-semibold leading-[140%]">
          Add New Policy
        </div>
        <ConnorDAOButton
          buttonText={'Save'}
          onClickEvent={function (): void {
            console.log('');
          }}
          buttonType={ButtonType.Secondary}
          buttonSize={ButtonSize.Small}
          isDisabled={false}
          className="leading-[0px]"
        ></ConnorDAOButton>
      </div>
      <div className="newPolicySection flex flex-col">
        <div className="flex justify-between">
          <div>Title</div>
          <div></div>
        </div>
        <div className="policyTextArea flex flex-col">
          <textarea
            className="w-full border border-[#000]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="newPolicySection flex flex-col">
        <div className="flex justify-between">
          <div>Policy</div>
          <div></div>
        </div>
        <div className="policyTextArea flex flex-col">
          <textarea
            className="w-full border border-[#000]"
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="flex justify-between">
          <div>Description</div>
          <div></div>
        </div>
        <MDEditor value={value} onChange={(e) => setValue(e!)} />
        <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
      </div>
    </div>
  );
};

export default NewPolicy;
