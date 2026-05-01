import { ReactFlow, Background, Controls, Node, Edge, Position, Handle, MarkerType } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./VoterJourney.css";
import { UserPlus, MapPin, IdCard, CheckCircle2, MessageCircle } from "lucide-react";

type HintPosition = "top" | "bottom" | "left" | "right";

type StepNodeData = {
  label: string;
  stepNum: string;
  icon: React.ElementType;
  description: string;
  bullets: string[];
  position: HintPosition;
  chatPrompt: string;
};

const handleAsk = (prompt: string) => {
  window.dispatchEvent(
    new CustomEvent("triggerChat", {
      detail: { prompt },
    })
  );
};

const CustomStepNode = ({ data }: { data: StepNodeData }) => {
  const Icon = data.icon;
  return (
    <div className="item-hints">
      <div className="hint" data-position={data.position}>
        <Handle type="target" position={Position.Left} style={{ background: "#ef4d23", border: "none", width: 10, height: 10 }} />
        <Handle type="source" position={Position.Right} style={{ background: "#ef4d23", border: "none", width: 10, height: 10 }} />

        <span className="hint-radius" />
        <span className="hint-dot">
          <Icon size={18} />
          <span style={{ fontSize: "9px", fontWeight: 700 }}>{data.stepNum}</span>
        </span>

        <div className="hint-content">
          <h4>{data.label}</h4>
          <ul>
            {data.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <button
            className="ask-raj-btn"
            onClick={() => handleAsk(data.chatPrompt)}
          >
            <MessageCircle size={12} />
            Ask RAJ about this
          </button>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = { customStep: CustomStepNode };

const initialNodes: Node[] = [
  {
    id: "1",
    type: "customStep",
    position: { x: 60, y: 180 },
    data: {
      label: "Register to Vote",
      stepNum: "Step 1",
      icon: UserPlus,
      position: "bottom",
      chatPrompt: "Explain how to register to vote in India using Form 6 and the NVSP portal. What documents do I need?",
      bullets: [
        "Fill Form 6 on NVSP portal",
        "Must be 18+ on Jan 1st",
        "Get your EPIC card in 2–3 weeks",
      ],
    },
  },
  {
    id: "2",
    type: "customStep",
    position: { x: 360, y: 60 },
    data: {
      label: "Find Polling Booth",
      stepNum: "Step 2",
      icon: MapPin,
      position: "bottom",
      chatPrompt: "How do I find my polling booth in India? What is an EPIC number and how do I use it?",
      bullets: [
        "Search on voters.eci.gov.in",
        "Your booth slip is delivered home",
        "Voting outside your booth is not allowed",
      ],
    },
  },
  {
    id: "3",
    type: "customStep",
    position: { x: 660, y: 280 },
    data: {
      label: "Bring Valid ID",
      stepNum: "Step 3",
      icon: IdCard,
      position: "top",
      chatPrompt: "What ID proof do I need to carry to the polling booth in India? Is Aadhaar enough?",
      bullets: [
        "EPIC (Voter ID) preferred",
        "Aadhaar, PAN, Passport accepted",
        "Digital copies NOT allowed",
      ],
    },
  },
  {
    id: "4",
    type: "customStep",
    position: { x: 960, y: 160 },
    data: {
      label: "Cast Your Vote",
      stepNum: "Step 4",
      icon: CheckCircle2,
      position: "left",
      chatPrompt: "Explain the full voting process inside the polling booth in India. What happens step by step after I enter?",
      bullets: [
        "Officer verifies your name in list",
        "Finger inked on left index",
        "Press blue button on EVM",
        "Verify the VVPAT slip for 7 secs",
      ],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2", source: "1", target: "2", type: "smoothstep", animated: true,
    style: { stroke: "#ef4d23", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4d23" },
  },
  {
    id: "e2-3", source: "2", target: "3", type: "smoothstep", animated: true,
    style: { stroke: "#ef4d23", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4d23" },
  },
  {
    id: "e3-4", source: "3", target: "4", type: "smoothstep", animated: true,
    style: { stroke: "#ef4d23", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4d23" },
  },
];

export const VoterJourney = () => {
  return (
    <section className="w-full mx-auto py-16 bg-gray-50/50">
      <div className="text-center mb-10 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          The Voter's Journey
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-3">
          Hover over each glowing node to reveal key information. Click <strong>"Ask RAJ"</strong> to get a detailed AI explanation instantly.
        </p>
        <span className="text-sm font-bold text-[#ef4d23] bg-orange-100 inline-block px-4 py-1.5 rounded-full animate-pulse">
          💡 Hover each step to explore
        </span>
      </div>

      <div className="w-full h-[480px] border-y border-gray-200 bg-[#f9f9fb]">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.35 }}
          minZoom={0.4}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#e5e7eb" gap={20} size={1} />
          <Controls className="!bg-white !shadow-md !border !border-gray-200" />
        </ReactFlow>
      </div>
    </section>
  );
};
