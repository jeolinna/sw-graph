import React, { useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
} from "reactflow";

import "reactflow/dist/style.css";
import type { AggregatedHeroDetails } from "../../types/shared";

interface HeroGraphProps {
  details: AggregatedHeroDetails;
}

export const HeroGraph: React.FC<HeroGraphProps> = ({ details }) => {
  /**
   * useMemo optimizes the creation of nodes and edges by re-calculating them only when details change.
   * This prevents unnecessary graph re-renders.
   */
  const layoutedElements = useMemo((): { nodes: Node[]; edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Create a unique ID for the hero using the ID or URL as a fallback
    const heroId = `hero-${details.hero.id || details.hero.url}`;

    // Main node - hero (center of the graph)
    nodes.push({
      id: heroId,
      data: { label: `${details.hero.name}` },
      position: { x: 300, y: 100 },
      style: {
        background: "#CF112D",
        color: "white",
        padding: "15px",
        borderRadius: "10px",
        fontWeight: "bold",
        fontSize: "16px",
        width: "220px",
        textAlign: "center",
      },
    });

    // Create nodes for movies (place them to the left of the character)
    details.films.forEach((film, index) => {
      const filmId = `film-${film.id || film.url}`;

      nodes.push({
        id: filmId,
        data: { label: `${film.title}` },
        position: { x: 50, y: 50 + index * 120 },
        style: {
          background: "#201751",
          color: "white",
          padding: "12px",
          borderRadius: "8px",
          width: "200px",
          textAlign: "center",
        },
      });

      // Connecting the hero with the film
      edges.push({
        id: `edge-${heroId}-${filmId}`,
        source: heroId,
        target: filmId,
        animated: true,
        style: { stroke: "#201751", strokeWidth: 3 },
      });
    });

    // Create nodes for ships (place them to the right of the hero)
    details.starships.forEach((starship, index) => {
      const starshipId = `starship-${starship.id || starship.url}`;

      nodes.push({
        id: starshipId,
        data: { label: `${starship.name}` },
        position: { x: 550, y: 50 + index * 120 },
        style: {
          background: "#3CBFAE",
          color: "white",
          padding: "12px",
          borderRadius: "8px",
          width: "200px",
          textAlign: "center",
        },
      });

      // Connecting the hero with the ship
      edges.push({
        id: `edge-${heroId}-${starshipId}`,
        source: heroId,
        target: starshipId,
        style: { stroke: "#3CBFAE", strokeWidth: 3 },
      });
    });

    return { nodes, edges };
  }, [details]);

  const [nodes, , onNodesChange] = useNodesState(layoutedElements.nodes);
  const [edges, , onEdgesChange] = useEdgesState(layoutedElements.edges);

  // Handling cases where the hero has no movies or ships
  if (layoutedElements.nodes.length === 1) {
    return (
      <div className="p-8 text-center">
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-800">Info</h3>
          <p className="text-yellow-700">
            <strong>{details.hero.name}</strong> Has no movies or starships to
            display in the graph.
          </p>
          <p className="text-sm text-yellow-600 mt-2">
            Films: {details.films.length}, Starships: {details.starships.length}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        position: "relative",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
