---
trigger: model_decision
description: "Authoritative 3D modeling, mesh topology, UV unwrapping, PBR materials, rigging, and DCC headless automation standards."
---

# 3D Modeling & Digital Asset Standards

## P0: MESH GEOMETRY & TOPOLOGY INVARIANTS

1. **MANIFOLD TOPOLOGY ONLY:**
   - Meshes must be 2-manifold without non-manifold edges, open boundaries (for solid objects), interior faces, or zero-area polygons.
   - Maintain quad-dominant topology with clean edge loops aligned to deformation and silhouette curvature.
   - Keep vertex valence between 3 and 5; avoid complex N-gons on deforming or curved surfaces.
2. **UNITS, SCALE & APPLIED TRANSFORMS:**
   - All assets must use the metric system (1 unit = 1.0 meter).
   - Apply all object-level transforms prior to export: object scale must be `(1.0, 1.0, 1.0)` and rotation `(0.0, 0.0, 0.0)`.
   - Place object origin (pivot point) at the functional grounding contact point (for characters, props, vehicles) or center of mass.
3. **UV UNWRAPPING & TEXEL DENSITY:**
   - UVs must not overlap within the standard `[0, 1]` UV coordinate space for unique texture bakes.
   - Maintain consistent texel density across corresponding parts of the asset.
   - Align UV seams to natural material boundaries, occluded crevices, and hard edges.
4. **PBR MATERIAL STANDARDS:**
   - Use standard metallic-roughness PBR texture channels: BaseColor/Albedo, Normal (tangent-space, standard orientation), Roughness, Metallic, Ambient Occlusion, and Emissive.
   - Follow standard naming conventions: `<AssetName>_<Channel>.<ext>` (e.g. `Turret_BaseColor.png`, `Turret_Normal.png`).
5. **COLLISION GEOMETRY & LOD HIERARCHY:**
   - Provide simplified collision meshes (prefixed `UCX_` or `collider_`) consisting of convex hulls or simple bounding boxes.
   - Structure level-of-detail chains with descending triangle counts:
     - **LOD0:** Full resolution silhouette and micro-detail (100%).
     - **LOD1:** Optimized silhouette (~50% polycount of LOD0).
     - **LOD2:** Distant billboard or low-poly silhouette (~25% polycount of LOD0).
6. **HEADLESS DCC AUTOMATION:**
   - All procedural Blender operations must support headless execution (`blender -b -P script.py`).
   - Scripts must exit with non-zero status codes on unhandled exceptions and log descriptive geometry diagnostics.
   - Ensure exported assets (glTF/GLB, FBX, USD) load cleanly and validate through automated format checkers.