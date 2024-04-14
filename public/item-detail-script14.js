document.addEventListener('DOMContentLoaded', function() {
    const itemDetailId = '14';
    // Load initial state for each checkpoint
    const checkpoints = document.querySelectorAll('.checkpoint');
    checkpoints.forEach((checkpoint) => {
        const stepId = checkpoint.dataset.stepId;
        fetch(`/api/get-checkpoint?stepId=${stepId}`)
            .then(response => response.json())
            .then(data => {
                checkpoint.style.backgroundColor = data.isComplete ? 'green' : 'red';
            })
            .catch(error => console.error('Error loading checkpoint state:', error));
    });

    // Fetch progress for each transaction
    const transactions = document.querySelectorAll('.transaction');
    transactions.forEach((transaction) => {
        fetch(`/api/get-progress14?transactionId=${transaction.dataset.transactionId}`)
            .then(response => response.json())
            .then(data => {
                const progressBar = document.getElementById(`progress-bar`);
                if (progressBar) {
                    progressBar.style.width = `${data.progressPercentage}%`;
                    progressBar.textContent = `${data.progressPercentage}%`;
                } else {
                    console.error('Progress bar element not found.');
                }
            })
            .catch(error => console.error('Error:', error));
    });
});

function toggleCheckpoint(cell, stepId) {
    if (cell && cell.style) {
        const isComplete = cell.style.backgroundColor === 'green';
        cell.style.backgroundColor = isComplete ? 'red' : 'green';
        saveChanges(stepId);
    } else {
        console.error('Checkpoint cell is null or does not have style property.');
    }
}

function saveChanges(stepId) {
    const dueDate = document.getElementById(`dueDate-${stepId}`).value;
    const pic = document.getElementById(`pic-${stepId}`).value;
    const checkpointCell = document.querySelector(`.checkpoint[data-step-id="${stepId}"]`);
    if (checkpointCell && checkpointCell.style) {
        const isComplete = checkpointCell.style.backgroundColor === 'green';

        fetch('/api/update-checkpoint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stepId: stepId,
                dueDate: dueDate,
                pic: pic,
                isComplete: isComplete,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Checkpoint updated:', data);
            updateProgress(); // Update the progress bar if needed
        })
        .catch(error => console.error('Error updating checkpoint:', error));
    } else {
        console.error('Error: Checkpoint cell not found or does not have style property.');
    }
}

function updateProgress() {
    // Fetch all checkpoints
    const checkpoints = document.querySelectorAll('.checkpoint');
    const totalCheckpoints = checkpoints.length;
    let completedCheckpoints = 0;

    // Count how many checkpoints are complete
    checkpoints.forEach((checkpoint) => {
        if (checkpoint.style.backgroundColor === 'green') {
            completedCheckpoints++;
        }
    });

    // Calculate the progress percentage
    const progressPercentage = (completedCheckpoints / totalCheckpoints) * 100;

    // Update the progress bar width and text content
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${progressPercentage.toFixed(2)}% Complete`;
    } else {
        console.error('Progress bar element not found.');
    }
}
