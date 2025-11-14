---
title: "Grew-TSE"
summary: "Python Package for Targeted Syntactic Evaluation of LLMs Cross-Linguistically via Treebank Querying."
layout: 
---


Grew-TSE, or Grew for Targeted Syntactic Evaluation, is a Python package that generates minimal-pair datasets from Universal Dependency treebanks with user-defined queries.
<div class="svg-container">
<svg xmlns="http://www.w3.org/2000/svg"
     width="820" height="200" viewBox="0 0 820 200" role="img"
     aria-labelledby="title desc">

  <style>
    /* Basic typography */
    .label { font: 16px/1.1 "Segoe UI", Roboto, Arial, sans-serif; fill: #111; }
    .token { font-weight: 700; font-size: 18px; fill: #0e2540; }
    .prob { font-size: 13px; fill: #0e2540; }
    .bar-bg { fill: #e6eef8; }
    .bar-fill { }
    .arrow { fill: #ff6b6b; }
    .ctx { font-size: 18px; fill: #2b2b2b; font-weight: 600; }
  </style>

  <!-- Layout: left context, right tokens -->
  <rect x="0" y="0" width="820" height="320" fill="white"/>

  <!-- Context box -->
  <g transform="translate(18,40)">
    <rect x="0" y="0" width="240" height="80" fill="#f6f8fb" rx="10" ry="10"/>
    <text x="16" y="30" class="ctx">Context:</text>
    <text x="16" y="56" class="label">"The keys to the cabinet "</text>
  </g>


  <!-- Tokens area start -->
  <g transform="translate(280,60)">
    <g id="cand-is" transform="translate(0,0)">
      <text x="50" y="7" class="token">is</text>
      <rect x="90" y="-12" width="300" height="24" rx="6" ry="6" class="bar-bg"/>
      <rect x="90" y="-12" width="0" height="24" rx="6" ry="6" class="bar-fill" fill="#9fc3ff">
        <animate attributeName="width"
                 from="0" to="120"
                 dur="1.5s" begin="0.3s" fill="freeze" />
      </rect>
      <text x="405" y="6" class="prob" opacity="0">
        0.40
        <animate attributeName="opacity" from="0" to="1" begin="0.3s" dur="0.5s" fill="freeze"/>
      </text>
    </g>
    <g id="cand-are">
      <g transform="translate(0,36)">
        <!-- Highlight background (appears first) -->
        <rect x="-6" y="-15" width="460" height="32" rx="10" ry="10" fill="#fff6e6" opacity="0">
          <animate attributeName="opacity" from="0" to="1" begin="2.5s" dur="0.2s" fill="freeze"/>
        </rect>
        <text x="50" y="7" class="token">are</text>
        <rect x="90" y="-12" width="300" height="24" rx="6" ry="6" class="bar-bg"/>
        <rect x="90" y="-12" width="0" height="24" rx="6" ry="6" class="bar-fill" fill="#7fc8a9">
          <animate attributeName="width"
                   from="0" to="180"
                   dur="1.5s" begin="0.45s" fill="freeze" />
        </rect>
        <text x="405" y="6" class="prob" opacity="0">
          0.60
          <animate attributeName="opacity" from="0" to="1" begin="0.45s" dur="0.5s" fill="freeze"/>
        </text>
      </g>
  </g>
</svg>
</div>
This can be used for the evaluation of a language model's performance on syntactic tasks, whether that be masked- or prompt-based. Its key advantage is the use of the [Grew query language](https://grew.fr/), allowing users to specify the exact syntactic construction and target feature they want to evaluate in a relatively easily-interpretable format. This means that you, your friends, and your family can all specify syntactic constructions they want to evaluate LLMs on. See an example below.

```sql
/* a grew query to find subject-verb-object constructions with accusative object*/
pattern {
  V [upos=VERB];
  OBJ [Case="Acc"]
  V -[nsubj]-> SUBJ;
  V -[obl]-> OBJ;
  SUBJ << V;
  OBJ >> V;
}
```

If we want to generate a minimal-pair dataset with the above query, we can use the package like so:
```python

from grewtse.pipeline import GrewTSEPipe

grewtse = GrewTSEPipe()
grewtse.parse_treebank("./treebanks/example.conllu")

grew_query = 
"""
    pattern {
      V [upos=VERB];
      OBJ [Case="Acc"]
      V -[nsubj]-> SUBJ;
      V -[obl]-> OBJ;
      SUBJ << V;
      OBJ >> V;
    }
"""
target_node = "OBJ"

grewtse.generate_masked_dataset(grew_query, target_node)
final_dataset = grewtse.generate_minimal_pairs({ 'case': 'Dat' }, {})
```

You can find more information on the GitHub page <a href="https://github.com/DanielGall500/Grew-TSE">here</a>