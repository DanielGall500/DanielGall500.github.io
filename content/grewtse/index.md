---
title: "Grew-TSE"
summary: "Python Package for Targeted Syntactic Evaluation of LLMs Cross-Linguistically via Treebank Querying."
layout: 
---

Grew-TSE, or Grew for Targeted Syntactic Evaluation, is a Python package that generates minimal-pair datasets from Universal Dependency treebanks with user-defined queries. This can be used for the evaluation of a language model's performance on syntactic tasks, whether that be masked- or prompt-based. Its key advantage is the use of the [Grew query language](https://grew.fr/), allowing users to specify the exact syntactic construction and target feature they want to evaluate in a relatively easily-interpretable format. This means that you, your friends, and your family can all specify syntactic constructions they want to evaluate LLMs on. See an example below.

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