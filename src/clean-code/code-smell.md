
# Code Smells — Quick Revision

**Code smells** are symptoms in code that may indicate deeper problems or poor design, making code harder to maintain, understand, or extend. They are not bugs, but warning signs for potential refactoring.

## Bloaters
- **Long Method**: Split into smaller helper methods.
- **Large Class**: Break into subclasses, use interfaces/abstractions.
- **Long Parameter List**: Use objects or helper methods instead.
- **Data Clumps**: Group related data into classes.

## Object-Orientation Abusers
- **Alternative Classes with Different Interfaces**: Rename methods for consistency.
- **Refused Bequest**: Prefer composition over inheritance; extract superclass if needed.
- **Switch Statements**: Replace with polymorphism (move logic to subclasses).
- **Temporary Field**: Remove or encapsulate fields only used in some cases.

## Change Preventers
- **Divergent Change**: One class changed for different reasons—split responsibilities.
- **Shotgun Surgery**: One change triggers many small changes—group related code.
- **Parallel Inheritance Hierarchies**: Refactor to use composition or single hierarchy.

## Dispensables
- **Comments**: Remove unnecessary comments; code should be self-explanatory.
- **Duplicate Code**: Eliminate redundancy.
- **Lazy Class**: Remove classes that do too little.
- **Data Class**: Add behavior to classes holding only data.
- **Dead Code**: Delete unused code.

## Couplers
- **Feature Envy**: Move methods to the class they use most.
- **Inappropriate Intimacy**: Reduce direct access between classes.
- **Message Chains**: Avoid long chains of calls; use intermediate variables.
- **Middle Man**: Remove unnecessary delegation.